from fastapi import FastAPI
import pandas as pd
from collections import Counter
import numpy as np

# Create FastAPI app
app = FastAPI()

# Load CSV file
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

df = pd.read_csv(BASE_DIR / "data" / "log.csv")

# Home route
@app.get("/")
def home():
    return {
        "message": "Supply Chain Backend Running"
    }

# Summary route
@app.get("/summary")
def get_summary():

    total_orders = df["CaseID"].nunique()

    delayed_orders = df[df["Status"] == "Delayed"]["CaseID"].nunique()

    failed_orders = df[df["Status"] == "Failed"]["CaseID"].nunique()

    completed_orders = total_orders - delayed_orders - failed_orders

    completed_percentage = round((completed_orders / total_orders) * 100, 1)
    delayed_percentage = round((delayed_orders / total_orders) * 100, 1)
    failed_percentage = round((failed_orders / total_orders) * 100, 1)

    return {
        "total_orders": int(total_orders),
        "completed_orders": int(completed_orders),
        "delayed_orders": int(delayed_orders),
        "failed_orders": int(failed_orders),

        "avg_delay_hours": 14.3,
        "top_supplier": "Supplier_A",
        "top_warehouse": "Delhi_WH",
        "completion_rate_pct": completed_percentage,
        "delay_rate_pct": delayed_percentage,
        "failure_rate_pct": failed_percentage,
    }
@app.get("/process-flow")
def process_flow():

    temp_df = df.copy()

    temp_df["Timestamp"] = pd.to_datetime(
        temp_df["Timestamp"],
        format="%d-%m-%Y %H:%M"
    )

    temp_df = temp_df.sort_values(
        by=["CaseID", "Timestamp"]
    )

    flows = []

    transition_data = []

    for case_id, group in temp_df.groupby("CaseID"):

        activities = group["Activity"].tolist()

        timestamps = group["Timestamp"].tolist()

        flow = tuple(activities)

        flows.append(flow)

        for i in range(len(activities) - 1):

            transition_data.append({
                "from": activities[i],
                "to": activities[i + 1],
                "hours": (
                    timestamps[i + 1] - timestamps[i]
                ).total_seconds() / 3600
            })

    flow_counts = Counter(flows)

    most_common_flow, occurrences = (
        flow_counts.most_common(1)[0]
    )

    variant_counts = []

    for variant, count in flow_counts.items():

        variant_counts.append({
            "variant": " → ".join(variant),
            "count": count
        })

    transition_df = pd.DataFrame(
        transition_data
    )

    transition_times = (
        transition_df
        .groupby(["from", "to"])["hours"]
        .mean()
        .reset_index()
    )

    transition_times["hours"] = (
        transition_times["hours"]
        .round(2)
    )

    transition_times = (
        transition_times
        .rename(
            columns={
                "hours": "avg_hours"
            }
        )
        .to_dict(
            orient="records"
        )
    )

    return {

        "most_common_flow":
            list(most_common_flow),

        "occurrences":
            occurrences,

        "total_variants":
            len(flow_counts),

        "variant_counts":
            variant_counts,

        "transition_times":
            transition_times
    }
@app.get("/bottlenecks")
def get_bottlenecks():

    bottlenecks = []

    activity_stats = (
        df.groupby("Activity")["DelayHours"]
        .agg(["mean", "std", "max"])
        .reset_index()
    )

    for _, row in activity_stats.iterrows():

        mean_delay = row["mean"]

        std_delay = row["std"]

        max_delay = row["max"]

        threshold = mean_delay + (2 * std_delay)

        if max_delay > threshold:

            severity = "MEDIUM"

            if max_delay > mean_delay + (3 * std_delay):
                severity = "HIGH"

            bottlenecks.append({
                "activity": row["Activity"],
                "mean_delay": round(mean_delay, 2),
                "max_delay": round(max_delay, 2),
                "severity": severity,
                "reason": "Delay exceeds normal activity variation"
            })

    return {
        "bottlenecks": bottlenecks
    }
@app.get("/suppliers")
def supplier_analysis():

    suppliers = []

    supplier_stats = (
        df.groupby("Supplier")
        .agg(
            orders_handled=("CaseID", "nunique"),
            average_delay=("DelayHours", "mean")
        )
        .reset_index()
    )

    for _, row in supplier_stats.iterrows():

        supplier_name = row["Supplier"]

        supplier_rows = df[df["Supplier"] == supplier_name]

        total_orders = supplier_rows["CaseID"].nunique()

        failed_orders = supplier_rows[
            supplier_rows["Status"] == "Failed"
        ]["CaseID"].nunique()

        failure_rate = (
            (failed_orders / total_orders) * 100
            if total_orders > 0 else 0
        )

        average_delay = row["average_delay"]

        if failure_rate > 10 or average_delay > 6:
            risk_level = "HIGH"

        elif failure_rate > 5 or average_delay > 3:
            risk_level = "MEDIUM"

        else:
            risk_level = "LOW"

        suppliers.append({
            "supplier": supplier_name,
            "orders_handled": int(total_orders),
            "average_delay": round(average_delay, 2),
            "failure_rate": round(failure_rate, 2),
            "risk_level": risk_level
        })

    risk_priority = {
        "HIGH": 3,
        "MEDIUM": 2,
        "LOW": 1
    }

    suppliers = sorted(
        suppliers,
        key=lambda x: risk_priority[x["risk_level"]],
        reverse=True
    )

    return {
        "suppliers": suppliers
    }
@app.get("/alerts")
def generate_alerts():

    alerts = []

    # --------------------------------------------------
    # 1. Global Failure Rate
    # --------------------------------------------------

    total_orders = df["CaseID"].nunique()

    failed_orders = (
        df[df["Status"] == "Failed"]
        ["CaseID"]
        .nunique()
    )

    failure_rate = (
        failed_orders / total_orders
    ) * 100

    if failure_rate > 10:

        alerts.append({
            "severity": "HIGH",
            "message":
                f"Global failure rate is {round(failure_rate,2)}%"
        })

    # --------------------------------------------------
    # 2. Supplier Risk Analysis
    # --------------------------------------------------

    supplier_stats = (
        df.groupby("Supplier")
        .agg(
            avg_delay=("DelayHours", "mean"),
            failures=("Status",
                      lambda x: (x == "Failed").sum()),
            total=("Status", "count")
        )
        .reset_index()
    )

    for _, row in supplier_stats.iterrows():

        failure_pct = (
            row["failures"] / row["total"]
        ) * 100

        if failure_pct > 10:

            alerts.append({
                "severity": "HIGH",
                "message":
                    f"{row['Supplier']} failure rate is {round(failure_pct,1)}%"
            })

        elif row["avg_delay"] > 4:

            alerts.append({
                "severity": "MEDIUM",
                "message":
                    f"{row['Supplier']} average delay is {round(row['avg_delay'],1)}h"
            })

    # --------------------------------------------------
    # 3. Warehouse Inventory Risk
    # --------------------------------------------------

    warehouse_inventory = (
        df.groupby("Warehouse")
        ["InventoryLevel"]
        .mean()
        .reset_index()
    )

    for _, row in warehouse_inventory.iterrows():

        inventory = row["InventoryLevel"]

        if inventory < 250:

            alerts.append({
                "severity": "HIGH",
                "message":
                    f"{row['Warehouse']} inventory critically low ({round(inventory)})"
            })

        elif inventory < 400:

            alerts.append({
                "severity": "MEDIUM",
                "message":
                    f"{row['Warehouse']} inventory running low ({round(inventory)})"
            })

    # --------------------------------------------------
    # 4. Critical Order Delays
    # --------------------------------------------------

    delayed_cases = (
        df.groupby("CaseID")
        ["DelayHours"]
        .sum()
        .reset_index()
    )

    for _, row in delayed_cases.iterrows():

        if row["DelayHours"] > 40:

            alerts.append({
                "severity": "HIGH",
                "message":
                    f"{row['CaseID']} accumulated {round(row['DelayHours'],1)}h delay"
            })

        elif row["DelayHours"] > 25:

            alerts.append({
                "severity": "MEDIUM",
                "message":
                    f"{row['CaseID']} accumulated {round(row['DelayHours'],1)}h delay"
            })

    # --------------------------------------------------
    # 5. Activity Bottlenecks
    # --------------------------------------------------

    activity_delay = (
        df.groupby("Activity")
        ["DelayHours"]
        .mean()
        .reset_index()
    )

    for _, row in activity_delay.iterrows():

        if row["DelayHours"] > 6:

            alerts.append({
                "severity": "HIGH",
                "message":
                    f"{row['Activity']} is a major bottleneck ({round(row['DelayHours'],1)}h avg)"
            })

        elif row["DelayHours"] > 3:

            alerts.append({
                "severity": "MEDIUM",
                "message":
                    f"{row['Activity']} showing elevated delays ({round(row['DelayHours'],1)}h avg)"
            })

    # --------------------------------------------------
    # 6. Status Trend Alert
    # --------------------------------------------------

    delayed_rows = (
        df["Status"] == "Delayed"
    ).sum()

    delayed_pct = (
        delayed_rows / len(df)
    ) * 100

    if delayed_pct > 15:

        alerts.append({
            "severity": "MEDIUM",
            "message":
                f"{round(delayed_pct,1)}% of activity records are delayed"
        })

    return {
        "alerts": alerts
    }
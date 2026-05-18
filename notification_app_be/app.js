import { Log } from "../logging_middleware/logger.js";

const notifications = [
    {
        ID: "1",
        Type: "Placement",
        Message: "Google Hiring Drive",
        Timestamp: "2026-04-22 17:51:18"
    },
    {
        ID: "2",
        Type: "Result",
        Message: "Mid-sem Result",
        Timestamp: "2026-04-22 17:51:30"
    },
    {
        ID: "3",
        Type: "Event",
        Message: "Farewell Event",
        Timestamp: "2026-04-22 17:51:06"
    },
    {
        ID: "4",
        Type: "Placement",
        Message: "Microsoft Hiring",
        Timestamp: "2026-04-22 18:00:00"
    }
];

const weights = {
    placement: 3,
    result: 2,
    event: 1
};

function getTopNotifications(data, topN = 10) {
    return data.sort((a, b) => {
        const weightDifference =
            weights[b.Type.toLowerCase()]
            -
            weights[a.Type.toLowerCase()];
        if (weightDifference !== 0) {
            return weightDifference;
        }
        return new Date(b.Timestamp)
            -
            new Date(a.Timestamp);
    }).slice(0, topN);
}

async function main() {
    const topNotifications =
        getTopNotifications(notifications);
    console.log(
        "\nTop Priority Notifications:\n"
    );
    topNotifications.forEach(
        (notification, index) => {
            console.log(
                `${index + 1}. [${notification.Type}] ${notification.Message}`
            );
        }
    );

    await Log(
        "backend",
        "info",
        "handler",
        "Top notifications fetched successfully"
    );
}

main();
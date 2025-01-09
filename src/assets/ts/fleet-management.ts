import FleetItem, {LocationData} from "./fleet-item.ts";
import SimpleDateTime from "./simple-date-time.ts";
import {FleetItemStatus} from "./fleet-item-status.ts";

export default class FleetManagement
{
    static async fleet(): Promise<FleetItem[]>
    {
        return Array.from({length: 50}).map((_, i) =>
        {
            const locData: LocationData = {
                current: {
                    latitude: +(Math.random() * 180 - 90).toFixed(6),
                    longitude: +(Math.random() * 360 - 180).toFixed(6)
                },
                starting: {
                    latitude: +(Math.random() * 180 - 90).toFixed(6),
                    longitude: +(Math.random() * 360 - 180).toFixed(6)
                },
                destination: {
                    latitude: +(Math.random() * 180 - 90).toFixed(6),
                    longitude: +(Math.random() * 360 - 180).toFixed(6)
                }
            };
            const status = Object.values(FleetItemStatus)[Math.floor(Math.random() * Object.values(FleetItemStatus).length)];
            let item = new FleetItem(
                `Fleet Item ${i}`,
                locData,
                status,
                SimpleDateTime.now()
            );
            item.id = (i * (1000 * Math.random()) + (1000 * Math.random())).toString(36).slice(-5);

            return item;
        });
        // return $.get("/api/fleet");
    }
}




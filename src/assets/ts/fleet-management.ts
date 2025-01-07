import FleetItem from "./fleet-item.ts";
import $ from 'jquery'

export default class FleetManagement {
    static async fleet():Promise<FleetItem[]>
    {
        return $.get("/api/fleet");
    }
}
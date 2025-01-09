import {FleetItemStatus} from "./fleet-item-status.ts";
import SimpleDateTime from "./simple-date-time.ts";
import $ from 'jquery'

export type Location = {
    latitude: number;
    longitude: number;
}

export type LocationData = {
    current: Location;
    starting: Location;
    destination: Location;
}

export default class FleetItem{
    id?: string;
    name: string;
    location: LocationData;
    status: FleetItemStatus;
    departed_time?: SimpleDateTime;


    /**
     * Constructs an instance of the FleetItem class.
     *
     * @param {string} name - The name of the fleet item.
     * @param {LocationData} location - The location data of the fleet item.
     * @param {FleetItemStatus} status - The current status of the fleet item.
     * @param {SimpleDateTime} departed_time - The departure time of the fleet item.
     */
    constructor(name: string, location: LocationData, status: FleetItemStatus, departed_time: SimpleDateTime)
    {
        this.name = name;
        this.location = location;
        this.status = status;
        this.departed_time = departed_time;
    }

    static async get(id: string): Promise<FleetItem>
    {
        return $.get(`/api/fleet/${id}`)
    }

}
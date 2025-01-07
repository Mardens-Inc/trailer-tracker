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
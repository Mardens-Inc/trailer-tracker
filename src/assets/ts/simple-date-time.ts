/**
 * Represents the options for formatting date and time values.
 *
 * This type defines the configuration options used to format date and time values,
 * including the selection of locale, numeric, and text representations for various
 * components such as year, month, day, hour, and more.
 *
 * Properties:
 * - `localeMatcher`: Defines the algorithm to select the best matching locale.
 * - `weekday`: Specifies the representation of the weekday.
 * - `era`: Determines the era format (e.g., AD/BC).
 * - `year`: Defines the format for the year component.
 * - `month`: Defines the representation of the month component.
 * - `day`: Specifies the format for the day component.
 * - `hour`: Determines the format for the hour component.
 * - `minute`: Specifies the format for the minute component.
 * - `second`: Indicates the format for the second component.
 * - `timeZoneName`: Configures the representation style for time zone names or offsets.
 * - `formatMatcher`: Specifies the matching algorithm for date components.
 * - `hour12`: Indicates whether to use a 12-hour clock or the locale's default preference.
 * - `timeZone`: Sets the desired time zone for the date and time formatting.
 */
export type FormatOptions = {
    // Determines how the locale is selected: "best fit" for best guess, "lookup" for exact match
    localeMatcher?: "best fit" | "lookup" | undefined;

    // Includes the weekday format: full name ("long"), short ("short"), or minimal ("narrow")
    weekday?: "long" | "short" | "narrow" | undefined;

    // Includes the era (e.g., AD/BC): "long", "short", or "narrow"
    era?: "long" | "short" | "narrow" | undefined;

    // Specifies the year format: full numeric or shortened (e.g., 2-digit)
    year?: "numeric" | "2-digit" | undefined;

    // Specifies the month format: numeric, 2-digit, or text ("long", "short", or "narrow")
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;

    // Specifies the day format: numeric or 2-digit
    day?: "numeric" | "2-digit" | undefined;

    // Specifies the hour format: numeric or 2-digit
    hour?: "numeric" | "2-digit" | undefined;

    // Specifies the minute format: numeric or 2-digit
    minute?: "numeric" | "2-digit" | undefined;

    // Specifies the second format: numeric or 2-digit
    second?: "numeric" | "2-digit" | undefined;

    // Specifies the time zone name format: short/long names or offsets
    timeZoneName?: "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined;

    // Determines how the components are matched: "best fit" for flexibility, "basic" for rigid format
    formatMatcher?: "best fit" | "basic" | undefined;

    // Indicates whether to use a 12-hour clock format; defaults to the locale's preference
    hour12?: boolean | undefined;

    // Specifies the desired time zone
    timeZone?: string | undefined;
}

/**
 * DefaultFormatOptions is a predefined configuration for date-time formatting.
 * It specifies the default options to use when formatting dates and times.
 *
 * The configuration includes:
 * - Day format as two digits.
 * - Month displayed as a short textual representation.
 * - Year displayed as two digits.
 * - Hour in numeric format.
 * - Minute displayed as two digits.
 * - Second in numeric format.
 * - 12-hour clock format enabled.
 * - Best-fit locale matcher algorithm.
 * - Full weekday name shown.
 * - No era displayed (undefined).
 * - Short timezone name format.
 * - Best-fit format matcher algorithm.
 * - Default timezone set to UTC.
 *
 * This object is typically used as a fallback or base configuration for date-time
 * formatting functions or libraries.
 */
export const DefaultFormatOptions: FormatOptions = {
    // Default options for date-time formatting
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    second: "numeric",
    hour12: true,
    localeMatcher: "best fit",
    weekday: "long",
    era: undefined,
    timeZoneName: "short",
    formatMatcher: "best fit",
    timeZone: "UTC"
};

/**
 * A class representing a simple date and time structure.
 *
 * This class provides functionality for creating, manipulating, and formatting
 * date and time values. The `SimpleDateTime` class encapsulates standard date
 * and time components, including day, month, year, hour, minute, and second.
 * It also provides static methods for creating instances from strings, existing
 * `Date` objects, or the current date and time.
 */
export default class SimpleDateTime
{
    // Day of the month
    day: number;

    // Month of the year
    month: number;

    // Year
    year: number;

    // Hour of the day
    hour: number;

    // Minute of the hour
    minute: number;

    // Second of the minute
    second: number;

    // The backing `Date` object for internal use
    private date: Date;

    /**
     * Constructs a `SimpleDateTime` object representing a specific date and time.
     *
     * # Parameters
     * - `day`: Day of the month (1-31)
     * - `month`: Month of the year (1-12)
     * - `year`: Year
     * - `hour`: Hour of the day (0-23)
     * - `minute`: Minute of the hour (0-59)
     * - `second`: Second of the minute (0-59)
     */
    constructor(day: number, month: number, year: number, hour: number, minute: number, second: number)
    {
        // Initialize date and time components
        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.minute = minute;
        this.second = second;

        // Create a Date instance with the provided fields
        this.date = new Date(year, month - 1, day, hour, minute, second);
    }

    /**
     * Formats the date and time using the specified `FormatOptions`.
     *
     * # Parameters
     * - `options`: Options to customize the formatting of the date/time.
     *
     * # Returns
     * - A formatted string representing the date and time.
     */
    format(options: FormatOptions): string
    {
        return this.toString(options);
    }

    /**
     * Parses an ISO 8601 datetime string and creates a `SimpleDateTime` instance.
     *
     * # Parameters
     * - `dateString`: A string in the ISO 8601 format (e.g., `yyyy-MM-ddTHH:mm:ss`).
     *
     * # Returns
     * - A new `SimpleDateTime` instance representing the parsed date/time.
     *
     * # Throws
     * - An error if the input string is not in the expected format.
     */
    static fromString(dateString: string): SimpleDateTime
    {
        // Split the input string into its components (date and time)
        const dateTimeParts = dateString.split(/[T:\-]/);
        if (dateTimeParts.length < 6)
        {
            throw new Error("Invalid ISO datetime string format.");
        }

        // Parse the components into numbers
        const [year, month, day, hour, minute, second] = dateTimeParts.map(part => parseInt(part, 10));

        // Create and return a new SimpleDateTime instance
        return new SimpleDateTime(day, month, year, hour, minute, second);
    }

    /**
     * Creates a `SimpleDateTime` from an existing `Date` object.
     *
     * # Parameters
     * - `date`: JavaScript `Date` object to convert.
     *
     * # Returns
     * - A `SimpleDateTime` instance representing the same date and time.
     */
    static fromDate(date: Date): SimpleDateTime
    {
        // Extract date and time components from the Date object
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        // Create and return a new SimpleDateTime instance
        return new SimpleDateTime(day, month, year, hour, minute, second);
    }

    /**
     * Creates a `SimpleDateTime` instance representing the current date and time.
     *
     * # Returns
     * - A `SimpleDateTime` instance representing the current date and time.
     */
    static now(): SimpleDateTime
    {
        // Use the current date and time
        return SimpleDateTime.fromDate(new Date());
    }

    /**
     * Converts the `SimpleDateTime` instance to a string using the specified `FormatOptions`.
     *
     * # Parameters
     * - `options`: Optional formatting options. If not specified, defaults are used.
     *
     * # Returns
     * - A formatted string representing the date and time.
     */
    toString(options: FormatOptions = DefaultFormatOptions): string
    {
        // Use the toLocaleString method with the provided options
        return this.date.toLocaleString("default", {...options});
    }
}
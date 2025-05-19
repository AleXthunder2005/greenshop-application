import {format} from "date-fns";
export const formatDate =
    (date: Date, pattern: string = 'dd MMM, yyyy') => format(date, pattern)
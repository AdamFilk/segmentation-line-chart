import axios from "axios"

export type ResponseModel = {
    status: string;
    meta: {
        aggregation_type: AggregationType,
    }
    data: {
        all_users: (DayDataModel | MonthDataModel | YearDataModel)[],
        engaged_sessions: (DayDataModel | MonthDataModel | YearDataModel)[],
        returning_users: (DayDataModel | MonthDataModel | YearDataModel)[],
        converted_users:(DayDataModel | MonthDataModel | YearDataModel)[],
        mobile: (DayDataModel | MonthDataModel | YearDataModel)[],
        desktop: (DayDataModel | MonthDataModel | YearDataModel)[],
    }
}

export type BaseDataModel = {
    users: number;
    session: number;
    bounce_rate: number;
    avg_session_duration: number;
    year: number;
    conversions: number;
    conversion_rate: number;
}

export type DayDataModel = BaseDataModel & { date: string }

export type MonthDataModel = BaseDataModel & { month: number }

export type YearDataModel = BaseDataModel & { year: number }

export enum AggregationType {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month'
}
export enum AttributionModel {
    FIRST_CLICK = 'first_click',
    LAST_CLICK = 'last_click'
}

export type SegmentationReportQuery = {
    start_date: string;
    end_date: string;
    site_identifier: string;
    aggregation_type: AggregationType,
    attribution_model: AttributionModel
}

export const segmentationReportApi = async (query: SegmentationReportQuery) => {
    try{
        const urlQeury = new URLSearchParams(query).toString();
        const res = await axios.get('https://blok-dev-sandbox-2swz3vbezq-uc.a.run.app/segmentation/ga-report' + `?${urlQeury}`);
        return res.data as ResponseModel;
    }catch(e){
        console.error(e)
    }
}
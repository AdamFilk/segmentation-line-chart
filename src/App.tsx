
import { useEffect, useState } from 'react';
import { AggregationType, AttributionModel, DayDataModel, MonthDataModel, segmentationReportApi, YearDataModel } from './api/api'
import './App.css'
import { LineChart } from './components/LineChart';

function App() {
  const [aggType, setAggType] = useState<AggregationType>(AggregationType.DAY);
  const [allUserData, setAllUserData] = useState<(DayDataModel | MonthDataModel| YearDataModel)[]>([]);
  const [mobileUserData, setMobileUserData] = useState<(DayDataModel | MonthDataModel| YearDataModel)[]>([]);
  const getSegmentations = async () => {
    const result = await segmentationReportApi({
      start_date: '2024-08-01',
      end_date: '2024-08-31',
      site_identifier: '1ef4b160-f47b-61a1-979e-0ef0da5d3e34',
      aggregation_type: aggType,
      attribution_model: AttributionModel.FIRST_CLICK
    });
    if(result){
      setAllUserData(result.data.all_users)
      setMobileUserData(result.data.mobile)
    }
  }

  useEffect(() => {
    getSegmentations();
  },[aggType])

  return (
    <div>
     {
      Object.values(AggregationType).map((val, index) => <button key={index} onClick={() => setAggType(val)}>{val}</button>)
     }
     <LineChart allUserData={allUserData} mobileUserData={mobileUserData} aggType={aggType}/>
    </div>
  )
}

export default App

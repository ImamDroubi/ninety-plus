import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFile} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import user from "../../assets/images/user.jpg";

import { useState } from 'react';
import Button from '@mui/material/Button';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function Description(){
  return (
    <>
      <h3 className='mb-3 text-xl font-bold text-gray-900 title'>الوصف</h3>
      <p className='text-gray-700'>
        دورة شاملة في منهاج الرياضيات للتوجيهي العلمي على مدار الفصل الأول كاملاً، ثلاث لقاءات أسبوعيا،
        بثوث مباشرة وحلول لأسئلة الدروس وأسئلة خارجية وأسئلة سنوات سابقة
        نماذج امتحانات ومواد إثرائية يقدمها الأستاذ محمد حرزالله
      </p>
    </>
  )
}
function AttachedFiles(){
  return (
    <>
      <div className="flex items-center justify-between p-2 file bg-gray-50">
        <div className="flex items-center gap-3 info">
          <div className="text-4xl icon text-primary-500">
            <FontAwesomeIcon icon={faFile} />
          </div>
          <div className="flex flex-col name">
            <a className="text-lg font-bold text-gray-900 cursor-pointer hover:underline">نموذج امتحان.pdf</a>
            <p className="text-sm text-gray-600">2.4 MB</p>
          </div>
        </div>
        <Button variant="contained" sx={{borderRadius:0}}>تحميل الملف</Button>
      </div>
    </>
  )
}
function StudentComment(){
  const [extended,setExtended] = useState(false);
  const text = "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات";
  return(
    <>
      <div className="flex items-center gap-2 text-sm header">
        <div className="object-cover w-6 h-6 rounded-full img">
          <img src={user} alt="" className='w-full h-full rounded-full' />
        </div>
        <div className="info">
          <div className="font-bold text-gray-900 name">يعقوب قمر الدين<span className='text-sm font-normal text-gray-600 time'> • 5 دقائق</span></div>
        </div>
      </div>
      <div className="body">
        <p className='text-gray-700 pr-[3.5rem] text-sm'>
          {
          text.length>150?
          extended?
            text
            :
            `${text.slice(0,147)}...`
          :
          text
          }
          {
            text.length>150?
            extended?
            <button onClick={()=>setExtended(false)} className='text-sm font-bold text-primary-700'>إظهار أقل</button>
            :
            <button onClick={()=>setExtended(true)} className='text-sm font-bold text-primary-700'>إظهار المزيد</button>
            :
            null
          }
        </p>
      </div>
      <hr className='my-2'/>
    </>
  )
}
function StudentsFeedback(){
  return (
    <>
      <h3 className='mb-3 text-xl font-bold text-gray-900 title'>تعليقات الطلاب</h3>
      <StudentComment/>
      <StudentComment/>
      <StudentComment/>
    </>
  )
}
export default function CourseInfoTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="الوصف" {...a11yProps(0)} />
          <Tab label="الملفات المرفقة" {...a11yProps(1)} />
          <Tab label="تعليقات الطلاب" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Description/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AttachedFiles/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <StudentsFeedback/>
      </CustomTabPanel>
    </Box>
  );
}
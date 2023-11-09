import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import user from "../../assets/images/user.jpg";
import { useState } from 'react';

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
      <h3 className='title text-gray-900 font-bold text-xl mb-3'>الوصف</h3>
      <p className='text-gray-700'>
        دورة شاملة في منهاج الرياضيات للتوجيهي العلمي على مدار الفصل الأول كاملاً، ثلاث لقاءات أسبوعيا،
        بثوث مباشرة وحلول لأسئلة الدروس وأسئلة خارجية وأسئلة سنوات سابقة
        نماذج امتحانات ومواد إثرائية يقدمها الأستاذ محمد حرزالله
      </p>
    </>
  )
}
function Teacher(){
  return (
    <>
      <h3 className='title text-gray-900 font-bold text-xl mb-3'>الأستاذ</h3>
      <div className="teacher flex flex-col gap-3">
        <div className="img w-full object-cover">
          <img src={user} alt="" className='w-full h-full' />
        </div>
        <p className='text-gray-700'>
          <span className='text-gray-900 font-bold'>أ.محمد حرزالله </span>
          خبرة 30 عاماً في تدريس التوجيهي، خريج جامعة كذا كذا
          خبرة 30 عاماً في تدريس التوجيهي، خريج جامعة كذا كذا
          خبرة 30 عاماً في تدريس التوجيهي، خريج جامعة كذا كذا
        </p>
      </div>
    </>
  )
}
function StudentComment(){
  const [extended,setExtended] = useState(false);
  const text = "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات";
  return(
    <>
      <div className="header flex gap-2 items-center">
        <div className="img w-6 h-6 object-cover rounded-full">
          <img src={user} alt="" className='w-full h-full rounded-full' />
        </div>
        <div className="info">
          <div className="name text-gray-900 font-bold">يعقوب قمر الدين<span className='time text-gray-600 text-sm font-normal'> • 5 دقائق</span></div>
        </div>
      </div>
      <div className="body">
        <p className='text-gray-700 pr-[3.5rem]'>
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
            <button onClick={()=>setExtended(false)} className='text-primary-700 font-bold text-sm'>إظهار أقل</button>
            :
            <button onClick={()=>setExtended(true)} className='text-primary-700 font-bold text-sm'>إظهار المزيد</button>
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
      <h3 className='title text-gray-900 font-bold text-xl mb-3'>تعليقات الطلاب</h3>
      <StudentComment/>
      <StudentComment/>
      <StudentComment/>
    </>
  )
}
export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="الوصف" {...a11yProps(0)} />
          <Tab label="الأستاذ" {...a11yProps(1)} />
          <Tab label="تعليقات الطلاب" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Description/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Teacher/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <StudentsFeedback/>
      </CustomTabPanel>
    </Box>
  );
}
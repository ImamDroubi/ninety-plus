import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCreateCourseContext } from "../../contexts/CreateCourseContext";
import CreateCourseFormResult from "../forms/create-course-forms/CreateCourseFormResult";
import { useNavigate, useSearchParams } from "react-router-dom";



export default function LinearStepper({ children = [], steps = [], formRef}) {
  
  const {isValid, isSubmitting} = useCreateCourseContext();
  
  const [activeStep, setActiveStep] = React.useState(0);

  const [searchParams,setSearchParams] = useSearchParams();

  React.useEffect(()=>{
    setSearchParams({tab : steps[0].param});
  },[])

  React.useEffect(()=>{
    let param = searchParams.get("tab");
    steps.map((item,key)=>{
      if(item.param == param){
        setActiveStep(key);
      }
    })
  },[searchParams])

  const handleNext = () => {
    if(activeStep === steps.length - 1){
      if(!isValid)return;
      formRef.current.dispatchEvent(new Event('submit' , {
        cancelable : true,
        bubbles : true
      }));
    }
    setSearchParams({tab : steps[activeStep+1].param});
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setSearchParams({tab : steps[activeStep-1].param});
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setSearchParams({tab : steps[0].param});
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label.name} {...stepProps}>
              <StepLabel {...labelProps}>{label.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>

          <CreateCourseFormResult handleReset={handleReset}/>

          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>رجوع للبداية</Button>
          </Box> */}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Here goes the children ----  */}
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {children[activeStep]}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              رجوع
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              variant="contained"
              disableElevation
              sx={{ borderRadius: "0" }}
              onClick={handleNext}
              disabled={activeStep === steps.length -1 && (!isValid || isSubmitting) }
            >
              {activeStep !== steps.length - 1 ? "التالي" : isSubmitting ?  "جاري المعالجة..." : "نشر"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

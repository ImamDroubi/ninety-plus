import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCreateCourseContext } from "../../contexts/CreateCourseContext";



export default function LinearStepper({ children = [], steps = [], formRef}) {
  
  const {isValid, isSubmitting} = useCreateCourseContext();
  
  const [activeStep, setActiveStep] = React.useState(0);


  const handleNext = () => {
    if(activeStep === steps.length - 1){
      if(!isValid)return;
      formRef.current.dispatchEvent(new Event('submit' , {
        cancelable : true,
        bubbles : true
      }));
      
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            تم تقديم الدورة للمراجعة... <br />
            سوف تصلك رسالة بالقبول أو الرفض.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>رجوع للبداية</Button>
          </Box>
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

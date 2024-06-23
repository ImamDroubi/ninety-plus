import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SlidingTabs(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (props.handleTabChange) props.handleTabChange(newValue);
  };

  useEffect(() => {
    setValue(props.currentIndex || 0);
  }, [props.currentIndex]);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {props.showTabs && (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {props.children.map((tab, index) => {
              return (
                <Tab
                  key={index}
                  label={tab.props.label}
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
        )}
      </Box>
      {props.children.map((tab, index) => {
        return (
          <CustomTabPanel key={index} value={value} index={index}>
            {tab}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
}

import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

// Temporary Data======================
const courseChapters = [
  {
    name: "حساب التفاضل",
    id: "chapter1",
    lessons: [
      {
        title: "متوسط التغير الحصة1",
        link: "#",
      },
      {
        title: "متوسط التغير الحصة2",
        link: "#",
      },
      {
        title: "قواعد الاشتقاق",
        link: "#",
      },
    ],
  },
  {
    name: "تطبيقات التفاضل",
    id: "chapter2",
    lessons: [
      {
        title: "نظريتا رول والقيمة المتوسطة",
        link: "#",
      },
      {
        title: "الاقترانات المتزايدة والمتناقصة",
        link: "#",
      },
      {
        title: "القيم القصوى",
        link: "#",
      },
    ],
  },
  {
    name: "المصفوفات والمحددات",
    id: "chapter3",
    lessons: [
      {
        title: "المصفوفة",
        link: "#",
      },
      {
        title: "العمليات على المصفوفات",
        link: "#",
      },
    ],
  },
];

// List Component

export function SelectedListItem({ chapter, setSearchParams }) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSearchParams({ lesson: index + 1 });
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <List component="nav" sx={{ padding: "0" }}>
        {chapter.lessons.map((lesson, ind) => {
          return (
            <ListItemButton
              selected={selectedIndex === ind}
              onClick={(event) => handleListItemClick(event, ind)}
              key={ind}
            >
              <ListItemText
                sx={{ textAlign: "right", "& span": { fontSize: "0.9rem" } }}
                primary={lesson.title}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export function CustomizedAccordions({ chapters = [], setSearchParams }) {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {chapters.map((chapter, key) => {
        return (
          <Accordion
            key={key}
            expanded={expanded === chapter.id}
            onChange={handleChange(chapter.id)}
          >
            <AccordionSummary
              sx={{
                color: expanded === chapter.id ? "rgb(255, 102, 54)" : "",
                backgroundColor:
                  expanded === chapter.id ? "rgb(245 247 250)" : "white",
              }}
              aria-controls={`${chapter.id}-content`}
              id={`${chapter.id}-header`}
            >
              <Typography>{chapter.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0" }}>
              <SelectedListItem
                chapter={chapter}
                setSearchParams={setSearchParams}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default function WatchCourseMenu({ chapters, setSearchParams }) {
  return (
    <CustomizedAccordions list={chapters} setSearchParams={setSearchParams} />
  );
}

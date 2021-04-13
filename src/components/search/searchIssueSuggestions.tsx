import React from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Issue from '../../models/issue';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 1024,
      maxHeight: "55vh",
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
      marginTop: "0",
      boxShadow: "5px 10px #000",
      borderRadius: "0 0 10px 10px"
    },
  }),
);

export default function SearchIssueSuggestions(props) {
  const classes = useStyles();

  const issues: Issue[] = props.issues;

  const handleClick = (event, index) => {
    event.stopPropagation();
    props.handleSuggestionSelected(issues[index]);
  }

  const renderList = () => {
    return (
        <List className={classes.root} component="nav">
          {issues.map( (issue, index) => {
            return (
              <ListItem button 
                        key={issue.id}
                        onClick={(event) => handleClick(event, index)}
                        selected={props.selectedIndex === index}                        
                        >
                <ListItemText primary={issue.title} />
              </ListItem>
            );
          })}
        </List>
    );
  }

  return (
    renderList()
  );
}
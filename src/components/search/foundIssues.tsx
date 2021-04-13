import React, { useState, useRef } from "react";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Issue from '../../models/issue';
import { Chip, Collapse } from '@material-ui/core';
import Markdown from 'markdown-to-jsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 1024,
      backgroundColor: theme.palette.background.paper,
      height: "100%",
      maxHeight: "100vh",
      overflow: "auto",
    },
    selected: {
      position: "absolute",
      top: "0%",
      backgroundColor: "green"
    },
  }),
);

export default function FoundIssues(props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const classes = useStyles();
  const issues: Issue[] = props.issues;

  const parseTime = (time: string) => {
    const date = new Date(time);
    const month = date.toLocaleString('default', { month: 'long' });

    return `${date.getFullYear()}, ${date.getUTCDate()} of ${month} at ${date.getHours()}:${date.getMinutes()}`
  }

  if (issues.length === 0) {
      return (
        <List className={classes.root}>
            <ListItem button key={0}>
                <ListItemText 
                    primary={"Nothing to display"}
                />
            </ListItem>
        </List>
      );
  }

  const handleClick = (event, index) => {
    if (isIndexSelected(index)) {
      setSelectedIndex(-1);
      props.handleIssueSelected(-1);
    } else {
      setSelectedIndex(index);
      props.handleIssueSelected(index);
    }
  }

  const isIndexSelected = (index) => {
    return ((index === selectedIndex) || (index === props.selectedIndex));
  }

  const renderLabels = (labels) => {
    return (
      <div>
          {labels.map(label => {
              return <Chip size="small" 
                          label={label.name}
                          style={{backgroundColor: `#${label.color}`}} />
          })}
      </div>
    );
  }

  return (
    <List className={classes.root}>
        {issues.map((issue, index) => {
          return (
            <List disablePadding component="div">
              <ListItem button key={issue.id}
                        onClick={ (event) => handleClick(event, index)}
                        selected={isIndexSelected(index)}
                        >
                <ListItemAvatar>
                <Avatar alt={issue.user.login} src={issue.user.avatarUrl}/>
                </ListItemAvatar>
                <ListItemText 
                    primary={issue.title} 
                    secondary={parseTime(issue.created_at)}
                />
                {renderLabels(issue.labels)}
              </ListItem>
              <Collapse in={isIndexSelected(index) && props.isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Markdown className="issue body">{issue.body}</Markdown>
                  </List>
                </Collapse>
            </List>
          );
        })}
    </List>
  );
}

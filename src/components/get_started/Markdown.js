// file copied from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/page-layout-examples/blog/Markdown.js
import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing.unit,
  },
});

const options = {
  overrides: {
    pre: { props: { style: { backgroundColor: '#f5f5f5', padding: '10px' } } },
    code: { props: { style: { backgroundColor: '#f5f5f5', padding: '3px' } } },
    h1: { component: props => <Typography gutterBottom variant="h4" {...props} /> },
    h2: { component: props => <Typography gutterBottom variant="h6" {...props} /> },
    h3: { component: props => <Typography gutterBottom variant="subtitle1" {...props} /> },
    h4: { component: props => <Typography gutterBottom variant="caption" paragraph {...props} /> },
    p: { component: props => <Typography paragraph {...props} /> },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
  },
};

function Markdown(props) {
  return <ReactMarkdown options={options} {...props} />;
}

export default Markdown;

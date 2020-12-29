import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

type Iprops = {};

export const Menu = ({}: Iprops) => {
  return (
    <List className="menu">
      <ListItem button>
        <ListItemIcon>+</ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>+</ListItemIcon>
        <ListItemText primary="Year" />
      </ListItem>
    </List>
  );
};

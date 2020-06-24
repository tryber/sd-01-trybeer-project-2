import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: 'lightgray',
    width: theme.spacing(22),
    maxHeight: theme.spacing(50),
  },
  media: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

function Cards(props) {
  const { image, price, name, id, quantity } = props;
  const classes = useStyles();
  const transformCurrency = currency =>
    currency.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL',
    });

  return (
    <Card className={classes.root}>
      <CardMedia id={id} className={classes.media} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h3">
          {name}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="h2">
          {transformCurrency(price)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <RemoveCircleIcon />
        </Button>
        <p>{quantity}</p>
        <Button size="small" color="primary">
          <AddCircleIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

export default Cards;

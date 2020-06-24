import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '90%',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function updateTotalValue(setTotal, price, method) {
  const { totalValue, setTotalValue } = setTotal;
  method === 'add' ? setTotalValue(totalValue + price) : setTotalValue(totalValue - price);
  return true;
}

function changeQuantity(name, qtt, func, setCurrentyQuantity, setTotal, price, method) {
  if (qtt < 0) return null;
  updateTotalValue(setTotal, price, method)
  func(name, qtt);
  setCurrentyQuantity(qtt)
}

function Cards(props) {
  const classes = useStyles();
  const { image, price, name, id, quantity, func, setTotal } = props;
  const [currentyQuantity, setCurrentyQuantity] = useState(quantity);

  return (
    <div>
      <Container className={classes.cardGrid} maxWidth='md'>
        <Grid item key={id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={image}
              title={name}
              data-testid={`${id}-product-img`}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant='h5' component='h2' data-testid={`${id}-product-price`}>
                R${price.toFixed(2)}
              </Typography>
              <Typography data-testid={`${id}-product-name`}>{name}</Typography>
            </CardContent>
            <CardActions>
              <Button size='small' color='primary'
                data-testid={`${id}-product-minus`}
                onClick={() => changeQuantity(name, currentyQuantity - 1, func, setCurrentyQuantity, setTotal, price, 'remove')
                }>
                <RemoveCircleIcon />
              </Button>
              <span data-testid={`${id}-product-qtd`}>{currentyQuantity}</span>
              <Button size='small' color='primary'
                data-testid={`${id}-product-plus`}
                onClick={() => changeQuantity(name, currentyQuantity + 1, func, setCurrentyQuantity, setTotal, price, 'add')
                }>
                <AddCircleIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default Cards;

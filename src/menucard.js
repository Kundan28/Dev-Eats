import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Checkout from './checkout.js';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: 'inline-block',
    justifyContent: 'center',
    margin: '1rem',
  },
  cardContainer: {
    textAlign: 'center',
  },
  checkoutContainer: {
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkout: {
    textAlign: 'center',
  }
}));

export default function ImgMediaCard() {
  const classes = useStyles();
  const [openCheckout, setOpenCheckout] = useState(false);
  const handleOpenCheckout = () => setOpenCheckout(true);
  const handleCloseCheckout = () => setOpenCheckout(false);
  const [products, setProducts]= useState([
    {
      name: "Cupcakes",
      description: "Peanut Butter Filling Chocolate Cupcakes",
      price: 170.00,
      image: "https://diviplus.io/wp-content/uploads/2020/09/coffee-item-7-1-300x300-1.png",
      quantity: 0
    },
    {
      name: "Salad",
      description: "Crunchy Cabbage Salad",
      price: 85.00,
      image: "https://diviplus.io/wp-content/uploads/2020/09/vegetable-salad.png",
      quantity: 0
    },
    {
      name: "Noodles",
      description: "Classic Noodles",
      price: 150.00,
      image: "https://diviplus.io/wp-content/uploads/2020/09/chowmein.png",
      quantity: 0
    },
    {
      name: "French Fries",
      description: "Instant Pot French Fries",
      price: 250.00,
      image: "https://diviplus.io/wp-content/uploads/2020/09/french-fries.png",
      quantity: 0
    }
  ]);

  const handleIncrement = (p) => {
    let product = products.find((pr) => pr.name === p.name);
    product.quantity += 1;
    const updatedProducts = products.map(p => {
        if (product.name === p.name) return product;

        return p;
    });

    setProducts(updatedProducts);
  }

  const handleDecrement = (p) => {
    let product = products.find((pr) => pr.name === p.name);
    product.quantity -= 1;
    const updatedProducts = products.map(p => {
        if (product.name === p.name) return product;

        return p;
    });

    setProducts(updatedProducts);
  }

  return (
    <div>
      <Container className={classes.cardContainer}>
        {
          products.map((product) => (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="300"
                  image={product.image}
                  title={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Divider />
              <CardActions>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {`₹ ${product.price}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6" component="h2">
                      
                      <div className="component">
                        {`Qty`}
                        <button
                          className="decrease"
                          disabled={product.quantity === 0}
                          onClick={() => handleDecrement(product)}
                        >
                          &ndash;
                        </button>
                        <h5>{product.quantity}</h5>
                        <button onClick={() => handleIncrement(product)}>+</button>
                      </div>
                    </Typography>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          ))
        }
        <Grid container className={classes.checkoutContainer}>
          <Button className={classes.checkout} variant="contained" color="primary" onClick={() => handleOpenCheckout()}>
            Checkout
          </Button>
        </Grid>
      </Container>
      <Checkout
        open={openCheckout}
        handleClose={() => handleCloseCheckout()}
        products={products}
      />
    </div>
  );
}
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const ItemCard = ({ title, price, image, amountServed }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={title + "_image"}
      />
      <CardHeader title={title}  />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {amountServed}
          <br/>
          price: ₹{price}/- per scoop
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to cart">
          < AddCircleIcon  color="secondary"  elevation={12} />
        </IconButton>
        
      </CardActions>
    </Card>
  );
};

export default ItemCard;
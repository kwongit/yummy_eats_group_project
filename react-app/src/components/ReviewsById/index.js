import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { thunkGetRestaurantReviews } from "../../store/reviews";
import { thunkGetRestaurants } from "../../store/restaurants";
import "../ManageReviews/ManageReviews.css"

export const RestaurantReviews = ({restaurantId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { restaurantId } = useParams();

    const user = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews.allReviews);
    const restaurants = useSelector((state) => state.restaurant.allRestaurants);

    const reviewsList = Object.values(reviews);
    const restaurantsList = Object.values(restaurants)

    // restaurantsList.map(restaurant => console.log("single restaurant: ", restaurant.name))
    console.log("restaurantList: ", restaurantsList)
    console.log("reviewList: ", reviewsList)

    function lowBudgetDateConverter(date) {
        let newDate = String(new Date(date))
        let month = newDate.substring(4, 7)
        let day = newDate.substring(7,10)
        let year = newDate.substring(10, 16)
        return month.concat(day, ",".concat(year))
    }

    // console.log(">>>>>>>>>>>>> LOOK: ", reviewsList.restaurant)

    // function getRestaurantName(restaurantId) {
    //     const target_restaurant = restaurantsList.find((restaurant) => {
    //         restaurant.id === restaurantId
    //     })
    //     return target_restaurant.name
    // }
    // console.log(getRestaurantName(1))


    useEffect(() => {
        dispatch(thunkGetRestaurantReviews(restaurantId));
        dispatch(thunkGetRestaurants());

    }, [dispatch]);

    if (!user) return null;

    const handleClick = () => {
        // COMEBACK LATER
    }
    // review.restaurant.name
    return (
        <div className="all-reviews-container">
            <h1>Restaurant Reviews</h1>
            {reviewsList.map((review) => (
                <div className="review-container" key={review.id}>
                    <div className="review-stars">
                        <h4>Stars: </h4>
                        {/* {review.stars} */}
                        <div className= {review.stars >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"}></div>
                        <div className= {review.stars >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"}></div>
                        <div className= {review.stars >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"}></div>
                        <div className= {review.stars >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"}></div>
                        <div className= {review.stars >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"}></div>
                    </div>
                    <div>
                        <h4>Reviewer: </h4> {review.user}
                    </div>
                    <div className="review-div">
                        <h4>Review:</h4> {review.review}
                    </div>
                    <div>
                        <h4>Updated on: </h4> {lowBudgetDateConverter(review.updated_at)}
                    </div>
                </div>
            ))}
        </div>
    )
}
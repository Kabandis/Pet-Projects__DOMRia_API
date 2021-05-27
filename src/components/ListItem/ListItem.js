import React, {useState, useEffect, useContext} from "react"
import {Link} from "react-router-dom"

import axios from "axios"
import { Context } from "../../contexts/Store"

const ListItem = ({itemsId}) => {
    const [response, setResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const context = useContext(Context)

    useEffect(() => {
        setIsLoading(true)
        async function getResponse() {await axios.get(`https://developers.ria.com/dom/info/${itemsId}?api_key=Rlr82vMNVzxZ2Zo9mMtOiitbEQTxqS86u3f1WB8s`)
        .then(function(res){
            setResponse(res.data)
            setIsLoading(false)
        })}
        getResponse()
    }, [itemsId])

    const addToWishlist = itemsId => {
        let arrFavouriteList = [...context.favouriteList]
        if (arrFavouriteList.indexOf(itemsId) < 0) {
            arrFavouriteList.push(itemsId)
        }
        else {
            arrFavouriteList.splice(arrFavouriteList.indexOf(itemsId), 1)
        }
        context.changeFavouriteList(arrFavouriteList)
    }

    return (
        <>
            {response && !isLoading
                ? <div className="list_item">
                    {response.main_photo 
                        ? <img 
                            className="item_photo"
                            src={`https://cdn.riastatic.com/photos/${response.main_photo.slice(0, -4)}b.webp`}
                            alt="Main"
                        /> 
                        : <div>No img</div>
                    }
                    <div className="item_info">
                        <div className="info_title">
                            <Link to={`/advertisement/${itemsId}`}>
                                {`
                                    ${response.district_type_name 
                                        ? response.district_type_name 
                                        : ""} 
                                    ${response.district_name
                                        ? response.district_name
                                        : ""
                                    } 
                                    ${response.street_name 
                                        ? response.street_name 
                                        : ""
                                    } 
                                    ${response.city_name_uk
                                        ? response.city_name_uk
                                        : ""
                                    }
                                `}
                            </Link>
                        </div>
                        <div className="info_price">
                            {response.priceArr
                                ? `${response.priceArr[1]} $`
                                : <div>Ціна не вказана</div>
                            }
                        </div>
                        <div className="info_description">
                            {response.description_uk 
                                ? `${response.description_uk.substring(0, 50)}...`
                                : <div>Опис відсутній</div>
                            }
                        </div>
                        <div className="info_footer">
                            <div className="info_createdAt">
                                <span>Добавлено: </span>
                                {response.created_at
                                    ? response.created_at
                                    : <div>Дата не вказана</div>
                                }
                            </div>
                            <button onClick={() => addToWishlist(itemsId)}>
                                {context.favouriteList.indexOf(itemsId) < 0 
                                    ? 'Додати в обрані' 
                                    : 'Видалити з обраних'
                                }
                            </button>
                        </div>
                    </div>
                </div>
                : ""
            }
        </>
    )
}

export default ListItem
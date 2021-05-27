import React, {useState, useEffect, useContext} from "react"
import axios from "axios"

import {Tabs, Tab} from 'react-bootstrap'
import Spinner from "react-bootstrap/Spinner"
import ImageGallery from 'react-image-gallery'
import { Context } from "../../contexts/Store"

const Advertisement = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const context = useContext(Context)

    let images = []

    useEffect(() => {
        setIsLoading(true)
        async function getResponse() {await axios.get(`https://developers.ria.com/dom/info/${props.match.params.id}?api_key=Rlr82vMNVzxZ2Zo9mMtOiitbEQTxqS86u3f1WB8s`)
        .then(function (res) {
            setResponse(res.data)
            setIsLoading(false)
        })}
        getResponse()
    }, [props.match.params.id])

    useEffect(() => {
        if (response != null) {
            let imgResponse = Object.values(response.photos)
            imgResponse.map(item => images.push({original: `https://cdn.riastatic.com/photos/${item.file.slice(0, -4)}b.webp`, thumbnail: `https://cdn.riastatic.com/photos/${item.file.slice(0, -4)}b.webp`}))
        }
    }, [images, response])

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
                ? <div className="advert_item">
                    <div className="advert_title">
                        {`
                            ${response.rooms_count
                                ? `${response.rooms_count}-кімнатна`
                                : ""
                            } 
                            ${response.realty_type_name
                                ? response.realty_type_name 
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
                        <button onClick={() => addToWishlist(parseInt(props.match.params.id))}>
                            {context.favouriteList.indexOf(parseInt(props.match.params.id)) < 0 
                                ? 'Додати в обрані' 
                                : 'Видалити з обраних'
                            }
                        </button>
                    </div>
                    <div className="advert_photos">
                        {images && images !== null && images !== undefined
                            ? <ImageGallery 
                                items={images} 
                                showPlayButton={false} 
                            />
                            : "Looool"
                        }
                    </div>
                    <div className="advert_info">
                        <Tabs 
                            defaultActiveKey="home" 
                            id="uncontrolled-tab-example"
                        >
                            <Tab 
                                eventKey="home" 
                                title="Основна інформація"
                            >
                                <p>
                                    {response.description
                                        ? response.description
                                        : "Опис відсутній"
                                    }   
                                </p>
                                <p>
                                    {response.price
                                        ? `${response.price} $` 
                                        : ""
                                    }
                                </p>
                                <p>
                                    {response.district_type_name
                                        ? `${response.district_type_name} `
                                        : ""
                                    }
                                    {response.district_name
                                        ? `${response.district_name} `
                                        : ""
                                    }
                                    {response.street_name
                                        ? `${response.street_name} `
                                        : ""
                                    }
                                    {response.building_number_str
                                        ? response.building_number_str
                                        : ""
                                    }
                                </p>
                            </Tab>
                            <Tab 
                                eventKey="profile" 
                                title="Характеристики"
                            >
                                <ul>
                                    <li>
                                        {response.rooms_count
                                            ? `Кількість кімнат: ${response.rooms_count}`
                                            : ""
                                        }
                                    </li>
                                    <li>
                                        {response.total_square_meters
                                            ? <>{`Загальна площа: ${response.total_square_meters} м`}<sup>2</sup></>
                                            : ""    
                                        }
                                    </li>
                                    <li>
                                        {response.kitchen_square_meters
                                            ? <>{`Площа кухні: ${response.kitchen_square_meters} м`}<sup>2</sup></>
                                            : ""
                                        }
                                    </li>
                                    <li>
                                        {response.floors_count && response.floor
                                            ? `Поверх: ${response.floor} з ${response.floors_count}`
                                            : ""
                                        }
                                    </li>
                                </ul>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                : <Spinner animation="border" />
            }
        </>
    )
}

export default Advertisement
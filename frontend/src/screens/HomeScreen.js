import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import TopProductsCarousel from '../components/TopProductsCarousel'
import Meta from '../components/Meta'

const HomeScreen = ({ match, history }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {!keyword ? (
                <>
                    <TopProductsCarousel />
                    <h1 className='pt-3'>Oxirgi mahsulotlar</h1>
                </>
            ) : (
                <>
                    <Button
                        className='btn btn-light my-3'
                        onClick={() => history.goBack()}
                    >
                        <i className='fas fa-chevron-left mr-1'></i>
                        Orqaga
                    </Button>
                    <h1 className='pt-3'>Natija</h1>
                </>
            )}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row className='latestProductsRow'>
                        {products.map((product) => (
                            <Col
                                className='cardContainer'
                                key={product._id}
                                xs={12}
                                sm={6}
                                md={6}
                                lg={4}
                                xl={3}
                            >
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default HomeScreen

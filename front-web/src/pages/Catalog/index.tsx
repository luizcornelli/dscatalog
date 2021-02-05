import { makeRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss';
import { ProductsResponse } from 'core/types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';

const Catalog = () => {
//quando o component iniciar buscas a lista de produtos >> 

// quando a lista de produtos estiver disponivel, popula um estado
// no componente e listar os produtos dinamicamente >>

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    /*
        Limitações do fetch 
        1. Verboso
        2. Não tem suporte nativo para ler o progresso de upload de arquivos
        3. Não tem suporte para query strings
    */

    useEffect(() => {

        const params = {
            page: 0, 
            linesPerPage: 10
        }

       // iniciar o loader
       setIsLoading(true);
       makeRequest({ url: '/products', params })
        .then(response => setProductsResponse(response.data))
        .finally(() => {
            // finalizar o loader
            setIsLoading(false);
        })
    }, []);

    return(

        <div className="catalog-container">
            <h1 className="catalog-title">Catálogo de Produtos</h1>

            <div className="catalog-products">
                { isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={ `/products/${ product.id }` } key={ product.id }>
                            <ProductCard product={ product }/>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default Catalog;
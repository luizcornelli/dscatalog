import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../assets/images/arrow.svg';
import './styles.scss';

type Props = {

    text: string;
}

const ButtomIcon = ({ text }: Props) => (
    <div className="d-flex">
        <button className="btn-primary btn-icon">
        <h5>
            inicie agora a sua busca
        </h5>
        </button>
        <div className="btn-icon-content">
            <ArrowIcon />
        </div>
    </div>
   
);

export default ButtomIcon;
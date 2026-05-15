import React from 'react';

const FormCard = ({ title, cardClassName = '', children, footer, onSubmit }) => {
    return (
        <div className="bal-form">
            <div className={`card${cardClassName ? ' ' + cardClassName : ''}`}>
                <div className="card-heading d-flex p-2">
                    {title}
                </div>
                <form onSubmit={onSubmit}>
                    <div className="card-body">
                        {children}
                    </div>
                    <div className="card-footer">
                        {footer}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormCard;

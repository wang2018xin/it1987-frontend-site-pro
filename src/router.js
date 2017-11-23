import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'dva/router';

const cached = {};
const registerModel = (app, model) => {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
};

const Routers = ({history, app}) => {
    const routes = [
        {
            path: '/',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/app'));
                    cb(null, require('./routes/app'));
                }, 'app');
            },
            childRoutes: [
                {
                    path: 'user',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/user'));
                            cb(null, require('./routes/user'));
                        }, 'user');
                    },
                },
                {
                    path: 'log',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/log'));
                            cb(null, require('./routes/log'));
                        }, 'log');
                    },
                },
            ],
        },
    ];

    const createElement = (Component, props) => {
        return <Component {...props} key={props.location.pathname}/>;
    };

    return (<Router
        createElement={createElement}
        history={history}
        routes={routes}
    />);

};

Routers.propTypes = {
    history: PropTypes.object,
    app: PropTypes.object,
};

export default Routers;


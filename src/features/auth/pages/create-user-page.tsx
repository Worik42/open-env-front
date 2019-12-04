import React, { Component, ChangeEventHandler } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { createUser } from '../api';
import { setAuth } from '../../common/actions';

const Container = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .MuiCardContent-root {
        padding: 16px;
        display: flex;
        flex-direction: column;
    }
`;

declare interface ICreateUserPage {
    setAuth: any;
}

class CreateUserPage extends Component<ICreateUserPage> {
    state = {
        username: '',
        password: '',
        isError: false
    };

    public componentDidMount() { }

    private handleUsername = (event: any): void => {
        this.setState({ username: event.target.value });
    };

    private handlePassword = (event: any): void => {
        this.setState({ password: event.target.value });
    };

    private submit = (): void => {
        const { username, password } = this.state;

        createUser(username, password).then(() => {
            this.props.setAuth(true);
            this.routeToLogin()
        });
    };

    private routeToLogin = (): void => {
        this.props.history.replace('/login');
    }

    public render(): JSX.Element {
        const { username, password, isError } = this.state;
        return (
            <Container>
                <Card>
                    <CardContent>
                        <Typography color="textPrimary" variant="h6" align="center">Регистрация</Typography>
                        <TextField id="standard-basic" value={username} onChange={this.handleUsername} label="Имя пользователя" />
                        <TextField id="standard-basic" type="password" value={password} onChange={this.handlePassword} label="Пароль" />
                    </CardContent>
                    <CardActions>
                        <Button onClick={this.submit} size="small">Создать аккаунт</Button>
                        <Button onClick={this.routeToLogin} size="small">Авторизация</Button>

                    </CardActions>
                </Card>
            </Container>
        );
    }
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
    setAuth
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateUserPage);

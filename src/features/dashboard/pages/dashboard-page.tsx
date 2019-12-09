import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const Container = styled('div')`
`;

declare interface IDashboard {
}

class Dashboard extends Component<IDashboard> {
    state = {};

    public componentDidMount() { }

    public render(): JSX.Element {
        return (
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            OpenEnv
                            
                        </Typography>
                    </Toolbar>
                </AppBar>
                <br /><br /> <p><big> Создание организации: </big></p>
                <TextField id="standard-basic" label="Введите название организации/мероприятия" variant="outlined" />
                <br /><br />
                <TextField id="filled-basic" label="Введите ширину" variant="outlined" />
                <br /><br />
                <TextField id="outlined-basic" label="Введите долготу" variant="outlined" /><br /><br />
                <TextField id="outlined-basic" label="Введите описание организации/мероприятия" variant="outlined" /><br /><br />
                <Button variant="outlined">
                    Создать
                </Button><br /><br />
            </Container>
        );
    }
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

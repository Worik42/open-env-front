import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {createOrganisation, getPositions} from '../api'

const Container = styled('div')`
`;

const Map = styled('div')`
    width: 100%;
    height: 400px;
    padding: 5px;
    margin-top: 20px;
    border: solid 1px gray;
    border-radius: 5px;   
`

const FormContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 500px;
`

const ContainerContent = styled('div')`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 25px;
`

const SubmitButton = styled(Button)`
margin-top: 25px !important;
`

declare interface IDashboard {
}

class Dashboard extends Component<IDashboard> {
    state = {
        name: '',
        lon: 0,
        lat: 0,
        desc: '',
        isOpenDrawer: false,
        selectedItem: 0
    };
    private requestPositions = () => {
        getPositions().then((res) => {
            ymaps.ready(function () {
                var myMap = new ymaps.Map('map', {
                    center: [55.349759, 86.120780],
                    zoom: 15
                }, {searchControlProvider: 'yandex#search'});

                res.body.map((item: any) => {
                    item.coordinate.map((coord: any) => {
                        const pl = new ymaps.Placemark([coord.latitude, coord.longitude]);
                        myMap.geoObjects.add(pl);
                    })
                });
            });

        })
    }
    public componentDidMount() {
        this.requestPositions();
    }

    private submit = () => {
        const {desc, lat, lon, name} = this.state
        createOrganisation(name, lat, lon, desc).then((res) => {
        })
    }

    private handlerName = (value: any) => {
        this.setState({name: value.target.value})
    }

    private handlerPositionLat = (value: any) => {
        this.setState({ lat: value.target.value })
    }

    private handlerPositionLon = (value: any) => {
        this.setState({ lon: value.target.value })
    }

    private handlerDescription = (value: any) => {
        this.setState({ desc: value.target.value })
    }

    private closeDrawer = () => {
        this.setState({ isOpenDrawer: false })
    }

    private openDrawer = () => {
        this.setState({ isOpenDrawer: true })
    }

    private handleChangeMenu = (id: number) => {
        this.requestPositions();
        this.setState({selectedItem: id})

    }


    public render(): JSX.Element {
        return (
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.openDrawer} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            OpenEnv
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.isOpenDrawer} onClose={this.closeDrawer}>
                    <List>
                        {['Карта', 'Создать организацию'].map((text, index) => (
                            <ListItem selected={index === this.state.selectedItem} onClick={() => this.handleChangeMenu(index)} button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                {this.state.selectedItem === 1 && <ContainerContent>
                    <Typography> Создание организации:</Typography>
                    <FormContainer>
                        <TextField id="standard-basic" onChange={this.handlerName}
                                   label="Введите название организации/мероприятия" variant="standard"/>

                        <TextField id="filled-basic" onChange={this.handlerPositionLat} label="Введите широту"
                                   variant="standard"/>

                        <TextField id="outlined-basic" onChange={this.handlerPositionLon} label="Введите долготу"
                                   variant="standard"/>
                        <TextField id="outlined-basic" onChange={this.handlerDescription}
                                   label="Введите описание организации/мероприятия" variant="standard"/>
                    </FormContainer>
                    <SubmitButton onClick={this.submit} variant="outlined">
                        Создать
                    </SubmitButton>
                </ContainerContent>
                }
                {this.state.selectedItem === 0 && <ContainerContent>
                    <Map id="map">
                    </Map>
                </ContainerContent>}


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

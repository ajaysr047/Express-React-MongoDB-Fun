import React, { Component } from 'react';
import Axios from 'axios';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import get from 'lodash/get';


//objective,need,srs,design,implementation,references
class form extends Component {

    
    constructor(props){
        super(props);
        this.AlertToggle = React.createRef();
    }
    state ={
        Name:'',
        AccNo: '',
        Balance: '',
        updateAccNo: '',
        updateBalance: '',
        debitAccNo:'',
        debitAmount:''
    }

    //Handle Change
    handleChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value  });
    }
    //Submit
    handleSubmit = (e) => {
        e.preventDefault();

        Axios.interceptors.response.use(
            response => response,
            error => {
              const err = get(error, ['response', 'data', 'err']);
          
              return err ? Promise.reject(err) : Promise.reject(error.message);
            },
          );

        const data = {
            Name: this.state.Name,
            AccNo: this.state.AccNo,
            Balance: this.state.Balance
        }
        const headers = {
            'Content-Type': 'application/json'
          }
          
        console.log('test1');
        Axios.post('http://localhost:3001/api/bank', {headers: headers}, { data } )
            .then(res =>{
                alert('Account Added! \nName :'+res.data.Name+'\nAccount No :'+res.data.AccNo+'\nBalance :'+res.data.Balance)
            })
            .catch(err =>{
                alert('Duplicate Account Number')
                
            } )
            // .catch((err) => { if (err.name === 'MongoError' && err.code === 11000) {
            //     // Duplicate username
            //     // return res.status(422).send({ succes: false, message: 'User already exist!' });
            //   } })
    }

    //Credit
    handleCredit = (e) => {
        e.preventDefault();
        const data = {
            AccNo: this.state.updateAccNo,
            Balance: this.state.updateBalance
        }
        const headers = {
            'Content-Type': 'application/json'
          }
          
        console.log('test');
        Axios.post('http://localhost:3001/api/bank/update', {headers: headers}, { data } )
            .then(res =>{
                
                alert('Updated Balance '+res.data.Balance);
            })
            .catch(err => alert(err))
    }
    //Debit
    handleDebit = (e) => {
        e.preventDefault();
        const data = {
            AccNo: this.state.debitAccNo,
            Balance: this.state.debitAmount
        }
        const headers = {
            'Content-Type': 'application/json'
          }
          
        console.log('test');
        Axios.post('http://localhost:3001/api/bank/debit', {headers: headers}, { data } )
            .then(res =>{
                
                alert('Updated Balance '+res.data.Balance);
            })
            .catch(err => alert('Balance not sufficient!'))
    }

    render() {
        const theme = createMuiTheme({
            typography: {
              fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ].join(','),
            },
          });
        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    
                <Paper number="24"><Typography variant="h3" align="center" >Add Bank Account</Typography></Paper>
                <br/>
                <TextField 
                        name="Name"
                        label="Customer Name" 
                        placeholder="Name"
                        required
                        onChange={this.handleChange}
                        defaultValue={this.state.Name}
                        type="text"
                    />
                    <br/>
                    <TextField 
                        name="AccNo"
                        label="Account Number" 
                        placeholder="Account Number"
                        required
                        onChange={this.handleChange}
                        defaultValue={this.state.AccNo}
                        type="text"
                    />
                    <br/>
                    <TextField 
                        name="Balance"
                        label="Account Initial Balance" 
                        placeholder="Balance"
                        required
                        onChange={this.handleChange}
                        defaultValue={this.state.Balance}
                        type="number"
                    />
                    <br/>
                    <br/>
                 <Button variant="outlined"  color="secondary" onClick={this.handleSubmit}>Add Account</Button>
                 
                </React.Fragment>
                <br/><br/>
                <Paper number="24"><Typography variant="h3" align="center" >Transactions</Typography></Paper>
                <br/><br/>
                <React.Fragment>
                
                <Paper number="20"><Typography variant="h4" align="center" >Credit</Typography></Paper>
                <br/>
                <TextField 
                        name="updateAccNo"
                        label="Account Number" 
                        placeholder="Account Number"
                        required
                        onChange={this.handleChange}
                        defaultValue={this.state.updateAccNo}
                        type="text"
                    />
                    <br/>
                <TextField 
                        name="updateBalance"
                        label="Amount" 
                        placeholder="Amount"
                        required
                        onChange={this.handleChange}
                        defaultValue={this.state.updateBalance}
                        type="number"
                    />
                    <br/>
                    <br/>
                    <Button variant="outlined"  color="secondary" onClick={this.handleCredit}>Credit Amount</Button>
                </React.Fragment>
                <br/><br/>
                <React.Fragment>
                
                <Paper number="20"><Typography variant="h4" align="center" >Debit</Typography></Paper>
                <br/>
                <TextField 
                        name="debitAccNo"
                        label="Account Number" 
                        placeholder="Account Number"
                        required
                        onChange={this.handleChange}
                        defaultValue={this.state.debitAccNo}
                        type="text"
                    />
                    <br/>
                <TextField 
                        name="debitAmount"
                        label="Amount" 
                        placeholder="Amount"
                        required
                        onChange={this.handleChange}
                        defaultValue={this.state.debitAmount}
                        type="number"
                    />
                    <br/>
                    <br/>
                    <Button variant="outlined"  color="secondary" onClick={this.handleDebit}>Debit Amount</Button>
                </React.Fragment>
            </MuiThemeProvider>     
        );
    }
}


export default form
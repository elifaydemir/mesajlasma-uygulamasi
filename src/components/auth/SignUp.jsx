import React, { useState,useEffect } from "react";
import {Grid, Segment,Form,Button, Message} from "semantic-ui-react";
import styles from "./signup.module.css"
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useFirebase } from "react-redux-firebase";
const SignUp = () => {
    const firebase = useFirebase();
    const {register,errors,handleSubmit,setValue}=useForm();
    const [fbErrors,setFbErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(()=> {
        register({name: "email"}, {required: true});
        register({name: "username"}, {required: true});
        register({name: "password"},{required: true, minLength: 6});
    },[]);
    const onSubmit = ({ username, email, password }, e) => {
        setSubmitting(true);
        setFbErrors([]);

        const [first, last] = username.split(" ");
        firebase
            .createUser(
                {
                    email,
                    password,
                },
                {
                    name: username,
                    avatar: `https://ui-avatars.com/api/?name=${first}+${last}&background=random&color=fff`,
                }
            )
            .then((user) => {
                console.log(user);
            })
            .catch((error) => {
                setFbErrors([{ message: error.message }]);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };
    const displayErrors = () =>
        fbErrors.map((error, index) => <p key={index}>{error.message}</p>);
    return (
        <Grid textAlign="center" verticalAlign="middle" className={styles.container}>
            <Grid.Column style={{maxWidth:450}}>
                <h1 className={styles.formHeader}>Develoveper
                    <span>.io</span></h1>
                <Form size="large" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Segment>
                        <Form.Input fluid icon="user" iconPosition="left" name="username" placeholder="Kullanıcı Adı"
                                    error={errors.username?true:false}
                                    onChange={(e, { name, value }) => {
                            setValue(name, value);
                        }}/>
                        <Form.Input fluid icon="mail" iconPosition="left" name="email" placeholder="Email Adresi "
                                    error={errors.email?true:false}
                                    onChange={(e, { name, value }) => {
                                        setValue(name, value);
                                    }}
                        />
                        <Form.Input fluid icon="lock" iconPosition="left" name="password" placeholder="Şifre" type="password"
                                    error={errors.password?true:false}
                                    onChange={(e, { name, value }) => {
                                        setValue(name, value);
                                    }}
                        />
                        <Button color="purple" fluid size="large" disabled={submitting}> Kaydol </Button>
                    </Segment>
                </Form>
                {fbErrors.length > 0 && <Message error> {displayErrors()}</Message>}
                <Message>
                    Zaten bir hesabın var mı?<Link to="/login"><a className={styles.messageLink} >Giriş Yap</a></Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default SignUp;
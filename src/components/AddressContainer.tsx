import { FormikErrors, FormikTouched, FormikValues } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../assets/colors/Colors";
import Input from "./Input";


export interface AddressProps {
    city?: string,
    state?: string,
    street?: string,
    cep?: string,
    location?: string
}

export function AddressContainer(
    props: {
        values: FormikValues, 
        errors: FormikErrors<any>,
        styles?: any,
        touched: FormikTouched<any>,
        setFieldValue(input: string, _:string): any,
        handleChange(input: string): any,
        handleBlur(input: string): any,
    }) {
    const { values, errors, touched } = props;

    return (
        <View
            style={[props?.styles, {
                width: "90%",
                backgroundColor: "#444",

                paddingBottom: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
            }]}
        >
            <Input 
                type="text"
                placeholder="Cidade"
                iconRight={
                    !errors?.address?.city ? "checkmark-outline"
                    : values.address.city == "" ? "" : "close-outline"
                }
                iconPress={() => props?.setFieldValue("address.city", "")}
                onChangeText={props?.handleChange("address.city")}
                onBlur={props?.handleBlur("address.city")}
                value={values.address.city}
                styleProps={{width: "100%", borderRadius: 0}}
            />
            {(errors.address?.city && touched.address?.city) &&
                <View style={[styles.errorsContainer, {paddingStart: 10}]}>
                    <Text style={styles.errors}>{errors.address?.city}</Text>
                </View>
            }
            <Input 
                type="text"
                placeholder="Estado - Ex. Ceará"
                iconRight={
                    !errors?.address?.state ? "checkmark-outline"
                    : values.address.state == "" ? "" : "close-outline"
                }
                iconPress={() => props?.setFieldValue("address.state", "")}
                onChangeText={props?.handleChange("address.state")}
                onBlur={props?.handleBlur("address.state")}
                value={values.address.state}
                styleProps={{width: "100%", borderRadius: 0}}
            />
            {(errors.address?.state && touched.address?.state) &&
                <View style={[styles.errorsContainer, {paddingStart: 10}]}>
                    <Text style={styles.errors}>{errors.address?.state}</Text>
                </View>
            }
            <Input 
                type="text"
                placeholder="Rua"
                iconRight={
                    !errors?.address?.street ? "checkmark-outline"
                    : values.address.street == "" ? "" : "close-outline"
                }
                iconPress={() => props?.setFieldValue("address.street", "")}
                onChangeText={props?.handleChange("address.street")}
                onBlur={props?.handleBlur("address.street")}
                value={values.address.street}
                styleProps={{width: "100%", borderRadius: 0}}
            />
            {(errors.address?.street && touched.address?.street) &&
                <View style={[styles.errorsContainer, {paddingStart: 10}]}>
                    <Text style={styles.errors}>{errors.address?.street}</Text>
                </View>
            }

            <Input 
                type="number"
                placeholder="CEP"
                iconRight={
                    !errors.address?.cep ? "checkmark-outline"
                    : values.address?.cep == "" ? "" : "close-outline"
                }
                iconPress={() => props?.setFieldValue("address.cep", "")}
                onChangeText={props?.handleChange("address.cep")}
                onBlur={props?.handleBlur("address.cep")}
                value={values.address.cep}
                styleProps={{width: "100%", borderRadius: 0, elevation: 0}}
            />
            {(errors.address?.cep && touched.address?.cep) &&
                <View style={[styles.errorsContainer, {paddingStart: 10}]}>
                    <Text style={styles.errors}>{errors.address?.cep}</Text>
                </View>
            }
            <Input 
                type="text"
                placeholder="Bairro"
                iconRight={
                    !errors.address?.location ? "checkmark-outline"
                    : values.address?.location == "" ? "" : "close-outline"
                }
                iconPress={() => props?.setFieldValue("address.location", "")}
                onChangeText={props?.handleChange("address.location")}
                onBlur={props?.handleBlur("address.location")}
                value={values.address.location}
                styleProps={{width: "100%", borderRadius: 0, elevation: 0}}
            />
            {(errors.address?.location && touched.address?.location) &&
                <View style={[styles.errorsContainer, {paddingStart: 10}]}>
                    <Text style={styles.errors}>{errors.address?.location}</Text>
                </View>
            }
        </View>
    )
}



const styles = StyleSheet.create({
    errorsContainer: {
		width: '90%',
        alignItems: 'flex-start',
		justifyContent: 'center',
    },
    errors: {
        fontFamily: 'Inter_600SemiBold',
		color: colors.darkRed,
        textAlign: 'left'
    }
});

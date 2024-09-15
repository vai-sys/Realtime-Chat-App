import axios from "axios"

import {HOST} from "../utils/Constants"

 export const apiClient=axios.create({
    baseURL:HOST
})
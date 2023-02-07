"use strict";

const makeError = ( statusCode, code, message, type = undefined, field = undefined ) => {
    const error = new Error( message );
    error.statusCode = statusCode;
    error.code = code;
    error.type = type;
    error.field = field;
    return error;
} 

const ER_UNAUTHORIZED_CLIENT = makeError( 401, "ER_UNAUTHORIZED_CLIENT", "Unauthorized client access to API.", "AUTHORIZATION" );
const ER_API_NOT_FOUND = makeError( 400, "ER_API_NOT_FOUND", "API cannot be found.", "REQUEST_VALIDATION" );
module.exports = {
  SUCCESS_MSG: 'Successfully Data Fetch',
  SUCCESS_LOGIN: 'Successfully Login.',
  SUCCESS_INSERT: 'Record Sucessfully Inserted.',
  SUCCESS_UPDATE: 'Record Sucessfully Updated.',
  SUCCESS_DELETE: 'Record Sucessfully Deleted.',
  SUCCESS_ACTIVE: 'Record Sucessfully Activated.',
  SUCCESS_DEACTIVE: 'Record Sucessfully Deactivated.',
  SUCCESS_REVIEW: 'Thank you for review',
  SUCCESS_RESETPASS: 'Password Successfully Updatesd',
  NOT_FOUND: "Record not found",
  SALARY_DATE_RONGE:'Start date is bigger then end date',
  TREND: 'Product display on trend.',
  NOTTREND: 'Product not display on trend.',
  FAIL_GET: 'No Data Found.',
  PRODUCT_NOT_FOUND: 'No such product exists!',
  CART_QNT_ERR: 'Please Check product quantity',
  ORDER_QNT_ERR: 'Please Check your cart',
  ORDER_CANCEL: 'Cancel order successfully',
  AUTHENTICATION_ERR: 'Authentication error',
  USER_EMAIL_EXISTS: 'Email has been already registered.',
  USER_EMAIL_MOBILE_EXISTS: 'Email or mobile number has been already registered.',
  USER_NOT_EXIST: "User not found",
  USER_SALARY_NOT_EXIST:"User Salary Not Exist",
  ORGANIZATION_NOT_EXIST: "Organization not found",
  TOGGLE_NOT_EXIST:"Toggle not found",  
  INVALID_OTP: "Invalid OTP",
  MAIL_SEND: "Email Sucessfully Send",
  WISHLIST_INSERT: 'Product Added to Wishlist.',
  WISHLIST_REMOVE: 'Product Removed from Wishlist.',
  SUCCESS_SUBSCRIBE: 'You have been sucessfully subscribe to our newsletters!',
  COUPON_EXPIRED: 'Coupon code expired.',
  SUCCESS_VERIFY: 'User verification successfull',
  NOT_VERIFIED: 'User not verified',
  FAIL_GET_COUPONCODE: 'No Coupon Code Found.',
  INVALID_LOGIN:"Invalid Login.",
  INVALID_LOGOUT:"Logout Error......",
  SUCCESS_LOGOUT:"Logout Successfully.....",
  COUPONCODE_USED: 'Coupon Code already used.',
  ER_UNAUTHORIZED_CLIENT:ER_UNAUTHORIZED_CLIENT,
  ER_API_NOT_FOUND:ER_API_NOT_FOUND

};

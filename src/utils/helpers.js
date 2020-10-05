import dayjs from 'dayjs';
import { Badge } from 'react-bootstrap';
import React from 'react'

export const currencyFormat = (amount) => {
  if(!amount) return '₦' + 0.00;
  return '₦' + parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const moneyFormat = (amount) => {
  if(!amount) return '₦' + 0.00;
  return parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const formatDate = (date) => {
  return dayjs(date).format('MMM DD, YYYY')
}

export const formatTime = (date) => {
  return dayjs(date).format('HH:mm:ss A')
}

export const formatDateWithTime = (date) => {
  return dayjs(date).format('MMM DD, YYYY HH:mm:ss A')
}

export const formatDateWithTime2 = (date) => {
  return dayjs(date).format('YYYY-MM-DD, HH:mm:ss A');
}

export const formatDateWithTime3 = (date) => {
  return dayjs(date).format('YYYY-MM-DD, HH:mm:ss');
}

export const status = (value) => {

  const requestStatus = {
    DECLINED: 'DECLINED',
    APPROVED: 'APPROVED',
    ACCEPTED: 'ACCEPTED',
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED'
  };

  switch (value) {
    case requestStatus.PENDING:
      return (<Badge pill variant="secondary">Pending</Badge>)
    case requestStatus.ACCEPTED:
        return (<Badge pill variant="primary">Accepted</Badge>)
    case requestStatus.APPROVED:
        return (<Badge pill variant="info">Approved</Badge>)
    case requestStatus.DECLINED:
        return (<Badge pill variant="dabger">Declined</Badge>)
    case requestStatus.COMPLETED:
      return (<Badge pill variant="success">Completed</Badge>)
    default:
      return (<Badge pill variant="secondary">Pending</Badge>)
  }
}

// export const regPatterns = {
//   email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//   phone: /^[0-9]*$/,
//   phone2: /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/,
//   phone3: /^[\+]\.[234]\.d{10}$/,
//   phone4: /^[\+]234[0-9]{10}$/,
//   amount: /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9][0-9])?$/,
// }

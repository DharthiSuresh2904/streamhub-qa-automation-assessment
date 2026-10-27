class EmiPage{
 constructor(page){this.page=page;this.amount=page.getByRole('spinbutton',{name:'Loan amount (₹)'});this.rate=page.getByRole('spinbutton',{name:'Annual interest rate (%)'});this.years=page.getByRole('spinbutton',{name:'Tenure (years)'});this.calculate=page.getByRole('button',{name:'Calculate EMI'});this.chart=page.getByTestId('repayment-chart');}
 async open(){await this.page.goto(process.env.BASE_URL||'http://127.0.0.1:3000');}
 async setLoan(amount,rate,years){await this.amount.fill(String(amount));await this.rate.fill(String(rate));await this.years.fill(String(years));await this.calculate.click();}
}
module.exports={EmiPage};

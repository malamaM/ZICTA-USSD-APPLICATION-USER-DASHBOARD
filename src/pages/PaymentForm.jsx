import React, { useEffect } from 'react';

import stripe from 'stripe';

const PaymentForm = () => {
  useEffect(() => {
    const handleFormSubmit = (event) => {
      event.preventDefault();

      const $form = document.querySelector('#payment-form');
      const $errorMessage = $form.querySelector('.error');
      const $inputs = $form.querySelectorAll('.required input');

      $errorMessage.classList.add('hide');

      let valid = true;

      $inputs.forEach((input) => {
        const $input = input;
        if ($input.value === '') {
          $input.parentNode.classList.add('has-error');
          $errorMessage.classList.remove('hide');
          valid = false;
        }
      });

      if (valid && !$form.getAttribute('data-cc-on-file')) {
        const cardNumber = $form.querySelector('.card-number').value;
        const cardCvc = $form.querySelector('.card-cvc').value;
        const cardExpiryMonth = $form.querySelector('.card-expiry-month').value;
        const cardExpiryYear = $form.querySelector('.card-expiry-year').value;

        Stripe.setPublishableKey($form.getAttribute('data-stripe-publishable-key'));

        Stripe.createToken(
          {
            card: {
              number: cardNumber,
              cvc: cardCvc,
              exp_month: cardExpiryMonth,
              exp_year: cardExpiryYear,
            },
          },
          stripeResponseHandler
        );
      }
    };

    const stripeResponseHandler = (status, response) => {
      const $form = document.querySelector('#payment-form');
      const $errorMessage = $form.querySelector('.error');

      if (response.error) {
        $errorMessage.classList.remove('hide');
        $errorMessage.querySelector('.alert').textContent = response.error.message;
      } else {
        const token = response.token.id;
        $form.querySelector('input[type=text]').value = '';
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'stripeToken';
        tokenInput.value = token;
        $form.appendChild(tokenInput);
        $form.submit();
      }
    };

    const removeErrorClass = () => {
      const $form = document.querySelector('#payment-form');
      const $errorMessage = $form.querySelector('.error');
      const $inputs = $form.querySelectorAll('.required input');

      $errorMessage.classList.add('hide');

      $inputs.forEach((input) => {
        const $input = input;
        $input.parentNode.classList.remove('has-error');
      });
    };

    const $form = document.querySelector('#payment-form');
    $form.addEventListener('submit', handleFormSubmit);

    return () => {
      $form.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-default credit-card-box">
            <div className="panel-heading display-table">
              <h3 className="panel-title">Payment Details</h3>
            </div>
            <div className="panel-body">
              <form
                action="{{ route('stripe.post') }}"
                method="post"
                className="require-validation"
                data-cc-on-file="false"
                data-stripe-publishable-key="{{ env('STRIPE_KEY') }}"
                id="payment-form"
              >
                @csrf
                <h1>ZICTA USSD Application Fee Payment</h1>

                <div className="form-row row">
                  <div className="col-xs-12 form-group required">
                    <label className="control-label" htmlFor="cardName">Name on Card</label>{' '}
                    <input
                      id="cardName"
                      className="form-control"
                      size="4"
                      type="text"
                    />
                  </div>
                </div>

                {/* Other form fields */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;

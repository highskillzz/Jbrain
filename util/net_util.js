const { Vector, sum, product } = require('../node_modules/vecto');
/* defines each layer's weight and biases, if two parameters are provided weights are
 * returned else biases.
 */
function lyr(neuron_count, ip_wts, fill_style = 1) {
    let v;
    if (!ip_wts) {
        if (fill_style === 1) {
            v = new Vector([neuron_count]);
            v.arrange();
        } else {
            v = Vector.zeroes([neuron_count]);
        }
    } else {
        if (fill_style === 1) {
            v = new Vector([neuron_count, ip_wts]);
            v.arrange();
        } else {
            v = Vector.zeroes([neuron_count, ip_wts]);
        }
    }
    return v;
}

/* weighted_input : calculates sigma(w*x) + b */

function weighted_input(w, x, b) {
    const wa = product(w, x);
    let flb = [];
    Vector.flatten(b, flb);
    let z = sum(sum(wa), flb);
    return z;
}

/* cost_grad : returns gradC wrt activ */

function cost_grad(a, y) {
    for (let i = 0; i < y.length; i++) {
        y[i] = -y[i];
    }
    const gradC = sum(a, y);
    return gradC;
}

/* sigma_dash : returns the sigma' for calculating the errors. */

function sigma_dash(z) {
    const sigmoid = require('./activ/sigmoid'); 
    return (sigmoid(z) * (1 - (sigmoid(z))));
}

function shuffle(input, mini_batch_size, labels) {
    const batch = [],
    y = [];
    let i;
    while (batch.length <= mini_batch_size) {
        i = Math.floor(Math.random() * input.length);
        batch.push(input[i]);
        y.push(labels[i]);
    }
    return [batch, y];
}



module.exports = {
    lyr: lyr,
    sigma_dash: sigma_dash,
    weighted_input: weighted_input,
    cost_grad: cost_grad,
    shuffle: shuffle
}


// export default net_util;
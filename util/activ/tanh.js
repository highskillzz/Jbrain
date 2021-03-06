function tanh(z) {
    const { math, core } = require('vecto');
    let z_ = z.map(i => -i),
        num = math.diff(math.exp(z), math.exp(z_)),
        den = math.sum(math.exp(z), math.exp(z_));
    return math.divide(num, den);
}

tanh.dash = (z) => {
    let a = tanh(z);
    return math.diff(1, math.pow(a, 2));
}

module.exports = tanh;
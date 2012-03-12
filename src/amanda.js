var Amanda = function(engine) {

  if (!hasProperty(engines, engine)) {
    throw new Error('The ‘' + engine + '’ engine is not supported. Please use a different one.');
  }

  return engines[engine];

};
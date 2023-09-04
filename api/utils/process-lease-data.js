export const processLeaseData = (leaseData) => {
  if (!leaseData || !leaseData.terms || Object.keys(leaseData.terms).length === 0) {
    return null
  }

  const {
    KEY_FOR_TERM: term,
    KEY_FOR_MF: mf,
    KEY_FOR_RV: rv,
    KEY_FOR_ACQFEE: acqFee,
  } = process.env

  const results = {
    programs: [],
    mileages: [],
    terms: [],
  }

  // all available mileages
  results.mileages = Object.keys(leaseData.terms).map(t => +t).sort()

  // all available terms (in months)
  for (const mileage of results.mileages) {
    for (const rate of leaseData.terms[mileage]) {
      if (!results.terms.includes(rate[term])) {
        results.terms.push(rate[term])
      }
    }
  }

  results.terms.sort()

  // all programs
  for (const thisTerm of results.terms) {
    for (const thisMileage of results.mileages) {
      const program = leaseData.terms[thisMileage].find(p => p[term] === thisTerm)

      if (program) {
        results.programs.push({
          term: thisTerm,
          mileage: thisMileage,
          mf: program[mf],
          rv: program[rv],
          acqFee: program[acqFee],
        })
      }
    }
  }

  return results
}
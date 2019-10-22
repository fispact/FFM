import json
import pypact as pp

flux_file = "/Volumes/Pegasus2/Code/FISPACT-II/system_tests/Tst_prot_he/fluxes"

ff = pp.FluxesFile()
pp.from_file(ff, flux_file)

data = {
    "name": ff.name.strip('\n').rstrip(),
    "group": len(ff.values),
    "energies": ff.boundaries,
    "values": ff.values,
    "normalisation": ff.norm
}

with open('fluxdata.json', 'w') as f:
    json.dump(data, f)

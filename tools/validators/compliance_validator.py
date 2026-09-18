def validate(report):
    required = ['implementation','result','tests']
    return [x for x in required if x not in report]

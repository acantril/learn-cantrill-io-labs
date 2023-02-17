from aws_cdk import (
    Stack,
    aws_lambda as _lambda
)
from constructs import Construct

class CdkProjectStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        test_lambda = _lambda.Function(self, 'hellohandler',
                        runtime = _lambda.Runtime.PYTHON_3_7,
                        code = _lambda.Code.from_asset('lambda'),
                        handler = 'hello.handler')

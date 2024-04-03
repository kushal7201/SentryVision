# __all__=["user","product"]  # for declaring the controller as a module __init__.py is created

import os
import glob

__all__=[os.path.basename(f)[:-3] for f in glob.glob(os.path.dirname(__file__) + "/*.py" )]


#define true 1
#define false 0


typedef int boolean;
typedef char* text;
typedef double number;



/*Base types*/
typedef struct activation {
  boolean activation;
} * Activation;

typedef struct boolean {
  boolean activation;
  boolean value;
} * Boolean;

typedef struct number {
  boolean activation;
  number value;
} * Number;

typedef struct text {
  boolean activation;
  text value;
} * Text;





/*Built-in when*/
void when (Activation /*in*/ this, Activation /*in*/ cond, Activation /*out*/ effect) {
  if(this->activation){
    effect->activation = cond->activation;
  }
}

/*Built-in a=b*/
void affect (Activation /*in*/ this, Activation /*out*/ a, Activation /*in*/ b) {


}

struct Label {
  char* value
}







void _prepareState (state* state) {

}
